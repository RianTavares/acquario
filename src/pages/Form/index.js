import React, { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import WaterInfo from '../../components/WaterInfo';
import {
  Form,
  FileUploaderDropContainer,
  FormItem,
  FileUploaderItem,
} from 'carbon-components-react';
import { settings } from 'carbon-components';

let lastId = 0;
function uid(prefix = 'id') {
  lastId += 1;
  return `${prefix}${lastId}`;
}
const { prefix } = settings;

const WaterForm = (props) => {
  const { multiple } = props;
  const [files, setFiles] = useState([]);
  const [waterInformation, setWaterInformation] = useState(null);
  const mainClass = 'service-page';

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleDragover = (e) => {
    e.preventDefault();
  };

  const uploadFile = async (fileToUpload, normalizedFile) => {
    if (normalizedFile.invalidFileType) {
      const updatedFile = {
        ...normalizedFile,
        status: 'edit',
        iconDescription: 'Delete file',
        invalid: true,
        errorSubject: 'Invalid file type',
        errorBody: `"${normalizedFile.name}" does not have a valid file type.`,
      };
      setFiles((files) => files.map(
        (file) => (file.uuid === normalizedFile.uuid ? updatedFile : file),
      ));
      return;
    }
    try {
      const formData = new FormData();
      formData.append('file', fileToUpload);
      const response = await axios.post('/api/v1/recognition/classify', formData)
        .then((response) => {
          const waterClass = response?.data?.images[0]?.classifiers[1]?.classes.length !== 0
            ? response?.data?.images[0]?.classifiers[1]?.classes[0]?.class
            : 'nao_agua';
          localStorage.setItem('acquario@waterClass', waterClass)
          setWaterInformation(response)
          return response
        });

      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }

      const updatedFile = {
        ...normalizedFile,
        name: fileToUpload.name,
        status: 'complete',
        iconDescription: 'Upload complete',
      };
      setFiles((files) => files.map(
        (file) => (file.uuid === normalizedFile.uuid ? updatedFile : file),
      ));

      setTimeout(() => {
        const updatedFile = {
          ...normalizedFile,
          name: fileToUpload.name,
          status: 'edit',
          iconDescription: 'Remove file',
        };
        setFiles((files) => files.map(
          (file) => (file.uuid === normalizedFile.uuid ? updatedFile : file),
        ));
      }, 1000);
    } catch (error) {
      const updatedFile = {
        ...normalizedFile,
        status: 'edit',
        iconDescription: 'Upload failed',
        invalid: true,
      };
      setFiles((files) => files.map(
        (file) => (file.uuid === normalizedFile.uuid ? updatedFile : file),
      ));
      console.log(error);
    }
  };

  const onAddFiles = useCallback(
    (evt, { addedFiles }) => {
      evt.stopPropagation();
      const newFiles = addedFiles.map((file) => ({
        uuid: uid(),
        name: file.name,
        filesize: file.size,
        status: 'uploading',
        iconDescription: 'Uploading',
        teste: file,
      }));
      if (multiple) {
        setFiles([...files, ...newFiles]);
        newFiles.forEach(uploadFile);
      } else if (newFiles[0]) {
        setFiles([newFiles[0]]);
        uploadFile(addedFiles[0], newFiles[0]);
      }
    },
    [files, multiple],
  );

  const handleFileUploaderItemClick = useCallback((_, { uuid: clickedUuid }) => {
    setWaterInformation(null);
    setFiles(files.filter(({ uuid }) => clickedUuid !== uuid));
  }, [files]);

  useEffect(() => {
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', handleDragover);
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', handleDragover);
    };
  }, []);

  return (
    <>
      <Form className={`${mainClass}__row__col2__container__form`} style={{ marginTop: '64px' }}>
        <FormItem>
          <strong className={`${prefix}--file--label`}>Enviar Imagem</strong>
          <p className={`${mainClass}__row__col2__container__form__row__col1__upload-description`}>
            Neste campo insira um foto de uma porção da água que você gostaria de testar (Formatos aceitos são .gif, .jpg, .png, .tif)
          </p>
          <FileUploaderDropContainer
            onAddFiles={onAddFiles}
            accept={[
              '.gif',
              '.jpg',
              '.png',
              '.tif',
            ]}
          />
          {files.map(
            ({
              uuid,
              name,
              filesize,
              status,
              iconDescription,
              invalid,
              ...rest
            }) => (
              <FileUploaderItem
                key={uid()}
                uuid={uuid}
                name={name}
                filesize={filesize}
                size="default"
                status={status}
                iconDescription={iconDescription}
                invalid={invalid}
                onDelete={handleFileUploaderItemClick}
                {...rest}
              />
            ),
          )}
        </FormItem>
      </Form>

      <WaterInfo data={waterInformation} />
    </>
  );
};

export default WaterForm;

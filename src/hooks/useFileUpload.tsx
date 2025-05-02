import { ChangeEvent, useRef, useState } from "react";

type UploadState = {
  finish: boolean;
  progress: number;
};

type UseFileUploadProps = {
  url: string;
  fieldName?: string;
  substituir?: boolean;
  pasta?: string;
  method?: "POST" | "PATCH";
  onFinish?: (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
  onProgress?: (event: ProgressEvent<XMLHttpRequestEventTarget>) => void;
};
export default function useFileUpload(props: UseFileUploadProps) {
  const {
    url,
    fieldName = "file",
    substituir = false,
    pasta = "/temp",
    onFinish: onLoad,
    onProgress,
    method = "POST",
  } = props;
  const [upload, setUpload] = useState<UploadState>({
    finish: false,
    progress: 0,
  });
  const inputRef = useRef<HTMLInputElement>(null);
  const sendFile = (fileList: FileList) => {
    const formData = new FormData();
    for (const file in fileList) {
      formData.append(`${fieldName}[${file}]`, fileList[file]);
    }
    formData.append("substituir", substituir ? "true" : "false");
    formData.append("pasta", pasta);
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("loadstart", () => {
      setUpload(() => ({ finish: false, progress: 0 }));
    });

    xhr.upload.addEventListener(
      "progress",
      function (event) {
        if (!event.lengthComputable) {
          return;
        }
        const completed = (event.loaded / event.total) * 100;
        setUpload((value) => ({ ...value, progress: completed }));
        onProgress?.(event);
      },
      false
    );
    xhr.addEventListener(
      "load",
      function (event) {
        setUpload(() => ({ progress: 0, finish: true }));
        onLoad?.(event);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
      },
      false
    );
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json, text/plain, */*");
    xhr.send(formData);
  };
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputFile = event.target;
    const file = inputFile.files;
    if (!file) return;
    sendFile(file);
  };

  return { onChange, ...upload, inputRef };
}

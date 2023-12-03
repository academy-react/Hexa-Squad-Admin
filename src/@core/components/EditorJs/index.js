import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import LinkTool from "@editorjs/link";
import Delimiter from "@editorjs/delimiter";
import Warning from "@editorjs/warning";
import Quote from "@editorjs/quote";
import ImageTool from "@editorjs/image";
import NestedList from "@editorjs/nested-list";
import { Button } from "reactstrap";

const EditorJsComponent = ({ setDescribe }) => {
  const [editorState, setEditorState] = useState();
  useEffect(() => {
    const editor = new EditorJS({
      holder: "editor",
      placeholder: "لطفا محتوا خود را وارد کنید",
      tools: {
        InlineCode: {
          class: InlineCode,
          shortcut: "CMD+SHIFT+I",
        },
        Marker: {
          class: Marker,
          shortcut: "CMD+SHIFT+M",
        },
        heckList: {
          class: CheckList,
          inlineToolbar: true,
        },
        linkTool: {
          class: LinkTool,
          config: {
            endpoint: "http://localhost:3000/fetchUrl",
          },
        },
        delimiter: Delimiter,
        header: Header,
        warning: Warning,
        quote: Quote,
        image: {
          class: ImageTool,
          config: {
            endpoint: {
              byFile: "http://localhost:3000/uploadFile",
              byUrl:
                "http://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5",
            },
          },
        },
        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
      },
    });
    console.log("editor", editor);
    setEditorState(editor);
  }, []);

  return (
    <div>
      <div id="editor"></div>
      <Button
        className="d-block mx-auto "
        color="info"
        type="button"
        onClick={() => {
          editorState
            .save()
            .then((outputData) => {
              console.log("outputData", outputData);
              setDescribe(outputData);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        ذخیره توضیحات دوره
      </Button>
    </div>
  );
};

export default EditorJsComponent;

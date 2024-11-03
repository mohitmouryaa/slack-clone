import Quill, { type QuillOptions } from "quill";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { PiTextAa } from "react-icons/pi";
import "quill/dist/quill.snow.css";
import { ImageIcon, SmileIcon } from "lucide-react";
import { MdSend } from "react-icons/md";
import Hint from "./hint";
import { Delta, Op } from "quill/core";
import { cn } from "@/lib/utils";

type EditorValue = {
  image: File | null;
  body: string;
};

interface EditorProps {
  onSubmit: ({ image, body }: EditorValue) => void;
  onCancel?: () => void;
  placeholder?: string;
  defaultValue?: Delta | Op[];
  disabled?: boolean;
  innerRef?: React.MutableRefObject<Quill | null>;
  variant?: "create" | "update";
}

export default function Editor({
  onSubmit,
  onCancel,
  placeholder = "Write something...",
  defaultValue = [],
  disabled = false,
  innerRef,
  variant = "create",
}: EditorProps) {
  const [text, setText] = useState("");
  const [isToolbarVisible, setIsToolbarVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef(onSubmit);
  const placeHolderRef = useRef<string>(placeholder);
  const quillRef = useRef<Quill | null>(null);
  const defaultValueRef = useRef<Delta | Op[]>(defaultValue);
  const disabledRef = useRef<boolean>(disabled);

  useLayoutEffect(() => {
    submitRef.current = onSubmit;
    placeHolderRef.current = placeholder;
    defaultValueRef.current = defaultValue;
    disabledRef.current = disabled;
  }, [defaultValue, disabled, onSubmit, placeholder]);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const editorContainer = container.appendChild(container.ownerDocument.createElement("div"));
    const options: QuillOptions = {
      theme: "snow",
      placeholder: placeHolderRef.current,
      modules: {
        toolbar: [["bold", "italic", "strike"], ["link"], [{ list: "ordered" }, { list: "bullet" }]],
        keyboard: {
          bindings: {
            enter: {
              key: "Enter",
              handler: () => {
                // TODO: SUBMIT FORM
                return;
              },
            },
            shift_enter: {
              key: "Enter",
              shiftKey: true,
              handler: () => {
                quillRef.current?.insertText(quillRef?.current?.getSelection()?.index || 0, "\n");
              },
            },
          },
        },
      },
    };

    const quill = new Quill(editorContainer, options);
    quillRef.current = quill;
    quillRef.current.focus();

    if (innerRef?.current) {
      innerRef.current = quill;
    }

    quill.setContents(defaultValueRef.current);
    setText(quill.getText());

    quill.on(Quill.events.TEXT_CHANGE, () => {
      setText(quill.getText());
    });

    return () => {
      quill.off(Quill.events.TEXT_CHANGE);
      if (container) {
        container.innerHTML = "";
      }
      if (quillRef.current) {
        quillRef.current = null;
      }
      if (innerRef?.current) {
        innerRef.current = null;
      }
    };
  }, [innerRef]);

  const toggleToolbar = () => {
    setIsToolbarVisible((current) => !current);
    const toolbarElement = containerRef.current?.querySelector(".ql-toolbar");
    if (toolbarElement) {
      toolbarElement.classList.toggle("hidden");
    }
  };

  const isEmpty = text.replace(/<(.|\n)*?>/g, "").trim().length === 0;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col overflow-hidden transition bg-white border rounded-md border-slate-200 focus-within:border-slate-300 focus-within:shadow-sm">
        <div ref={containerRef} className="h-full ql-container" />
        <div className="flex px-2 pb-2 z-[5]">
          <Hint label={isToolbarVisible ? "Hide formatting" : "Show formatting"}>
            <Button onClick={toggleToolbar} disabled={disabled} size={"iconSm"} variant={"ghost"}>
              <PiTextAa className="size-4" />
            </Button>
          </Hint>
          <Hint label="Emoji">
            <Button onClick={() => {}} disabled={disabled} size={"iconSm"} variant={"ghost"}>
              <SmileIcon className="size-4" />
            </Button>
          </Hint>
          {variant === "create" && (
            <Hint label="Image">
              <Button onClick={() => {}} disabled={disabled} size={"iconSm"} variant={"ghost"}>
                <ImageIcon className="size-4" />
              </Button>
            </Hint>
          )}
          {variant === "update" && (
            <div className="flex items-center ml-auto gap-x-2">
              <Button variant={"outline"} size={"sm"} onClick={() => {}} disabled={disabled}>
                Cancel
              </Button>
              <Button
                size={"sm"}
                onClick={() => {}}
                disabled={disabled || isEmpty}
                className="bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
              >
                Save
              </Button>
            </div>
          )}
          {variant === "create" && (
            <Hint label="Send">
              <Button
                onClick={() => {}}
                disabled={disabled || isEmpty}
                size={"iconSm"}
                className={cn(
                  "ml-auto",
                  isEmpty
                    ? "bg-white hover:bg-white text-muted-foreground"
                    : "bg-[#007a5a] hover:bg-[#007a5a]/80 text-white"
                )}
              >
                <MdSend className="size-4" />
              </Button>
            </Hint>
          )}
        </div>
      </div>
      <div className="p-2 text-[10px] text-muted-foreground flex justify-end">
        <p>
          <strong>Shift + Return</strong>
        </p>
        &nbsp; to add a new line
      </div>
    </div>
  );
}

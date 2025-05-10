import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { GrUpdate } from "react-icons/gr";
const TermsCondition = () => {
  const [content, setContent] = useState(`
    <h3 class="paragraph">When do we collect information?</h3>
    <p class="description">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum.</p>
  `);

  const editor = useRef(null);
  const config = {
    toolbar: {
      items: [
        "bold",
        "italic",
        "underline",
        "align",
        "left",
        "center",
        "right",
      ],
    },
    // Optional: Disable other features if necessary
    buttons: ["bold", "italic", "underline", "left", "center", "right"],
  };

  return (
    <div className="h-full bg-white0 p-5">
      <div className="w-full  p-6 ">
        <h2 className=" font-bold mb-4 text-[#242424] text-3xl roboto">
          Terms And Condition
        </h2>
        <div className=" p-5 rounded-md mt-9">
          <JoditEditor
            ref={editor}
            value={content}
            onChange={(newContent) => setContent(newContent)}
            config={config} // Apply the custom config
          />
        </div>
        <div
          // onClick={handleUpdate}
          className="cursor-pointer mt-6 px-4"
        >
          <button className="px-3 py-2 flex items-center gap-3 poppins font-medium rounded-xl bg-[#009038] text-white cursor-pointer ">
            <GrUpdate /> Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsCondition;

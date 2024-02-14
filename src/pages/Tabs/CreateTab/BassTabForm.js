import React from "react";

//Styles
import "styles/tabs/tabsContent.css";
import "styles/tabs/editTabStiles.css";

export function BassTabForm(props) {

  return (
      <article className="tab-root box-border border-solid border-x border-y border-slate-300 bg-slate-100 w-172 mx-auto my-8 p-4">
        {props.editing === true ? (
          <button
            name="Acept"
            className="bg-orange-200 px-4 py-2 ml-5 rounded hover:bg-orange-100"
            onClick={props.saveEdit}
          >
            {" "}Acept{" "}
          </button>
        ) : (
          ""
        )}
        {props.editing === true ? (
          <button
            name="Cancel"
            className="bg-orange-200 px-4 py-2 ml-5 rounded hover:bg-orange-100"
            onClick={props.cancelEdit}
          >
            {" "}Cancel{" "}
          </button>
        ) : (
          ""
        )}
      </article>
  );
}

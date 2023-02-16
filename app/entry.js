'use strict'

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./js/App.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


// import FDRS from '3NF_SYNTHESIS'

// const FdRelationScheme = FDRS.FdRelationScheme

// const relation_name_input = document.getElementById('relation_name')
// const relation_attributes_input = document.getElementById('relation_attributes')
// const relation_fds_input = document.getElementById('relation_fds')

// const what_to_do_select = document.getElementById('what_to_do')

// const do_button = document.getElementById('do')
// const result_div = document.getElementById('result')

// do_button.onclick = () => {
//   const scheme = create_relation_scheme()

//   const what_to_do = what_to_do_select.value

//   console.log(what_to_do)

//   switch (what_to_do) {
//     case 'synthesize':
//       const decomposed_schemes = FDRS.synthesize_into_3NF(scheme)
//       for (const decomposed_scheme of decomposed_schemes) {
//         console.log(decomposed_scheme)
//       }
//       break;

//     case 'check_normality':
//       console.log("BCNF?: " + scheme.is_in_BCNF())
//       break;

//     default:
//       console.log('hofffffge')
//       break;
//   }
// }

// function create_relation_scheme() {
//   const raw_relation_name = relation_name_input.value
//   const raw_relation_attributes = relation_attributes_input.value
//   const raw_relation_fds = relation_fds_input.value

//   const relation_name = raw_relation_name.trim()
//   const relation_attributes = raw_relation_attributes.split(',').map(str => str.trim())
//   // TODO: raw_relation_fds から抽出する
//   const relation_fds = [
//     [relation_attributes, relation_attributes]
//   ]

//   const scheme = new FdRelationScheme(
//     relation_name,
//     relation_attributes,
//     relation_fds
//   )

//   return scheme
// }

// import { createStore, produce } from "solid-js/store";
import { createSignal } from "solid-js";
import { Step, type Row } from "./types";
import { createStore } from "solid-js/store";

const [tab, setTab] = createSignal<Step>(Step.Categorize);

const [store, setStore] = createStore({
  rows: [] as Row[],
  sums: [] as number[],
});

// function updateRow(rowIndex: number){
// setStore(...)
// }

export { tab, setTab, store, setStore };

// accessing store items doesn't need the function call even if it is a signal
// store items are initialized during a return or other tracking scopes like
// a createEffect callback

// const [store, setStore] = createStore({
// rows: [] as Row[],
// sums: [] as number[],
// })

// setStore("rows", (currentRows) => {
// the return type cannot be void
// return [ // this appends a new row in the array
// ...currentRows, // spreading is not required for objects as used below
// {
// date: "today",
// value: "-1",
// label: "test",
// mainCategory: "bonjour",
// subCategory: "je suis"
// }
// ]
// })

// updating the store elements with the path syntax
// setStore('rows', [3], "mainCategory", "new main category");
// setStore('rows', [3], "mainCategory", (mainCategory) => mainCategory + "AA");
// setStore('rows', rows => rows.value > "+0", "mainCategory", (mainCategory) => mainCategory + "AA"); // filtering rows and updating the previous mainCategory value
// setStore('rows', 3, row => ({ ...row, label: row.label.split("t")[0] }));
// setStore('rows', 3, row => ({ label: row.label.split("t")[0] })); // without spreading object attributes

// produce() is a function to update multiple attributes at the same time in a single setStore() callback
// setStore("rows", 3, produce((row) => {
// row.mainCategory = "newMainCategory"
// row.subCategory = "newSubCategory"
// }))

//reconcile() <-- let's us merge arrays/objects cleanly
//unwrap() <-- let's us extract a store attribute into a regular object

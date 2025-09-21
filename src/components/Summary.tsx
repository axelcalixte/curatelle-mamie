import { For } from "solid-js";
import { store } from "../state";

export default function Summary() {
    const rows = () => store.rows;
    const subCatsSums = new Map<string, number>();

    function getEveryUniqueSubCats() {
        for (const row of rows()) {
            if (!subCatsSums.has(row.subCategory!)) {
                subCatsSums.set(row.subCategory!, row.value * 100);
            } else {
                subCatsSums.set(row.subCategory!, row.value * 100 + subCatsSums.get(row.subCategory!)!);
            }
        }
    }

    function mappedSums() {
        function cached() {
            if (subCatsSums.size > 0) return subCatsSums;
            else {
                getEveryUniqueSubCats();
                return subCatsSums;
            }
        }
        return [...cached()].map(([key, value]) => ({ key, value }));
    }

    return (<>
        <h3 class="title is-3"> RESSOURCES </h3>

        <table class="table">
            <tbody>
                <For each={mappedSums().filter(x => x.value > 0)}>
                    {(entry) => <tr><td>{entry.key}</td><td>{entry.value / 100}</td></tr>}
                </For>
            </tbody>
        </table>

        <h3 class="title is-3"> DEPENSES </h3>

        <table class="table">
            <tbody>
                <For each={mappedSums().filter(x => x.value < 0)}>
                    {(entry) => <tr><td>{entry.key}</td><td>{entry.value / 100}</td></tr>}
                </For>
            </tbody>
        </table>
    </>);
}


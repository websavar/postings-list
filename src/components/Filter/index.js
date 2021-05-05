import React from "react";
import "./index.scss";

const Filter = props => {

    var currentFocus;

    const onChangeHandler = (e, list) => {
        const input = e.target;
        let val = input.value;
        let divList, divItem;

        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        divList = document.createElement("DIV");
        divList.setAttribute("id", input.id + "-autocomplete-list");
        divList.setAttribute("class", "autocomplete-items");
        divList.addEventListener("click", sendFilterValues);
        input.parentNode.appendChild(divList);
        for (let item of list) {
            if (e.target.getAttribute('id') === 'country') item = item.name;
            if (item.substr(0, val.length).toLowerCase() === val.toLowerCase()) {
                divItem = document.createElement("DIV");
                divItem.innerHTML = "<strong>" + item.substr(0, val.length) + "</strong>";
                divItem.innerHTML += item.substr(val.length);
                divItem.addEventListener("click", () => {
                    input.value = item;
                    closeAllLists();
                });
                divList.appendChild(divItem);
            }
        }
    };

    const onkeyDownHandler = e => {
        let items = document.getElementById(e.target.id + "-autocomplete-list");
        if (items) items = items.getElementsByTagName("div");
        if (e.keyCode === 40) { // arrow DOWN
            currentFocus++;
            addActive(items);
        } else if (e.keyCode === 38) { // arrow UP
            currentFocus--;
            addActive(items);
        } else if (e.keyCode === 13) { // Enter
            e.preventDefault();
            if (currentFocus > -1 && items) items[currentFocus].click();
            sendFilterValues();
        }
    };

    const addActive = (items) => {
        if (!items) return false;
        removeActive(items);
        if (currentFocus >= items.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (items.length - 1);
        items[currentFocus].classList.add("autocomplete-active");
    }

    const removeActive = (items) => {
        for (let item of items) item.classList.remove("autocomplete-active");
    }

    const closeAllLists = () => {
        const items = document.getElementsByClassName("autocomplete-items");
        for (let item of items) item.parentNode.removeChild(item);
    }

    document.addEventListener("click", e => closeAllLists(e.target));

    const sendFilterValues = () => {
        const country = document.querySelector('#country')?.value.toLowerCase();
        const department = document.querySelector('#department')?.value.toLowerCase();
        return props.getFilterValues(country, department);
    }

    return (
        <form className="filter form-row col-12">
            <div className="form-group col-12 col-sm-5 col-md-4">
                <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="country"
                    placeholder="Country"
                    list="countryList"
                    onChange={(e) => onChangeHandler(e, props.countries)}
                    onKeyDown={onkeyDownHandler}>
                </input>
            </div>
            <div className="form-group col-6 col-sm-5 col-md-4">
                <input
                    autoComplete="off"
                    type="text"
                    className="form-control"
                    id="department"
                    placeholder="Department"
                    onChange={(e) => onChangeHandler(e, props.departments)}
                    onKeyDown={onkeyDownHandler}>
                </input>
            </div>
            <div className="form-group col-6 col-sm-2 col-md-1 pr-xl-4">
                <button
                    type="button"
                    className="btn btn-outline-success btn-block"
                    id="btn-search"
                    onClick={sendFilterValues}
                >
                    <i className="fas fa-search"></i>
                </button>
            </div>
        </form>
    );
};

export default Filter;


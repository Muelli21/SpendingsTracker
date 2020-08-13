class InputGui {
    constructor(spendingMonth) {
        this.spendingMonth = spendingMonth;
        this.inputGuiElement = document.getElementById("inputGui");
        inputGui = this;
    }

    clear() {
        clearElement(this.inputGuiElement);
        dashboard.clear();
        dashboard.getDashboardElement().style.overflow = "hidden";
        console.log("the input gui has been cleared!")
    }

    close() {
        let inputGui = document.getElementById("inputGui");

        window.scrollTo({
            top: inputGui.offsetTop,
            left: 0,
            behavior: 'smooth'
        });

        toggleDisplayVisibility(this.inputGuiElement, false);
        this.clear();
    }

    setButton(text, fixedPosition, functionToCall) {

        let buttonSection = document.getElementById("buttonSection");

        if (typeof (buttonSection) == 'undefined' || buttonSection == null) {
            buttonSection = setHTMLElement(this.inputGuiElement, "div", "buttonSection");
            buttonSection.id = "buttonSection";
        }

        if (fixedPosition) {
            buttonSection.classList.add("fixed");
        } else {
            buttonSection.classList.remove("fixed");
        }

        createTextButtonElement(buttonSection, text, "buttonSectionButton", functionToCall);
    }

    openCategorySelector() {

        this.clear();

        let inputGuiElement = document.getElementById("inputGui");
        let flexContainer = setHTMLElement(inputGuiElement, "div", "gridContainer");

        for (let spendingCategory of spendingCategories) {
            let div = setHTMLElement(flexContainer, "div", "categoryDiv");
            let button = createButtonElement(div, spendingCategory.getName() + "Button", "spendingCategoryButton", (function (variable) {
                return function () {
                    inputGui.openSpendingInput(variable);
                };
            })(spendingCategory));

            let labelElement = button[1];

            setHTMLElement(labelElement, "img", "categoryImage").src = spendingCategory.getIconUrl();
            createTextElement(labelElement, spendingCategory.getName(), "categoryText");
        }

        this.setButton("cancel", false, function () {
            inputGui.close();
            dashboard.open();
        });

        toggleDisplayVisibility(this.inputGuiElement, true);
    }

    openBudgetInput() {

        this.clear();

        let inputContainer = setHTMLElement(this.inputGuiElement, "div", "inputContainer");
        let imageDiv = setHTMLElement(inputContainer, "div", "spendingInputCategoryDiv");

        setHTMLElement(imageDiv, "img", "spendingInputImage").src = "./Resources/Money.png";
        createTextElement(imageDiv, "Budget", "spendingInputText");

        let formDiv = setHTMLElement(inputContainer, "div", "formDiv");
        let budgetInputElement = setHTMLElement(formDiv, "input", "inputGuiInput");

        budgetInputElement.setAttribute("type", "number");
        budgetInputElement.placeholder = "e.g. 1000";

        let errorTextElement = createTextElement(formDiv, "Please fill out the form and press 'submit'!");

        this.setButton("cancel", true, function () {
            inputGui.close();
            dashboard.open();
        });

        this.setButton("submit", true, function () {

            let budget = budgetInputElement.value;

            if (budget == "") {
                updateTextElement(errorTextElement, "The input field has to be filled out!!!")
                return;
            }

            if (isNaN(budget)) {
                console.log("This is not a valid number!");
                return;
            }

            let spendingMonth = dashboard.getSpendingMonth();

            spendingMonth.setBudget(budget);
            console.log("The budget was set to " + budget + " euros!");
            inputGui.close();
            dashboard.open();
        });

        toggleDisplayVisibility(this.inputGuiElement, true);
    }

    openSpendingInput(spendingCategory) {

        this.clear();

        let inputContainer = setHTMLElement(this.inputGuiElement, "div", "inputContainer");
        let imageDiv = setHTMLElement(inputContainer, "div", "spendingInputCategoryDiv");

        setHTMLElement(imageDiv, "img", "spendingInputImage").src = spendingCategory.getIconUrl();
        createTextElement(imageDiv, spendingCategory.getName(), "inputText");

        let formDiv = setHTMLElement(inputContainer, "div", "formDiv");
        let costInputElement = setHTMLElement(formDiv, "input", "inputGuiInput");

        costInputElement.setAttribute("type", "number");
        costInputElement.placeholder = "0";

        let nameInputElement = setHTMLElement(formDiv, "input", "inputGuiInput");

        costInputElement.setAttribute("type", "text");
        nameInputElement.setAttribute("maxlength", 20);
        nameInputElement.placeholder = "name";

        let errorTextElement = createTextElement(formDiv, "Please fill out the form and press 'submit'!");

        this.setButton("cancel", true, function () {
            inputGui.close();
            dashboard.open();
        });

        this.setButton("submit", true, function () {

            let cost = costInputElement.value;
            let name = nameInputElement.value;

            if (cost == "" || name == "") {
                updateTextElement(errorTextElement, "Both input fields have to be filled out!!!")
                return;
            }

            if (isNaN(cost)) {
                console.log("This is not a valid number!");
                return;
            }

            let spendingMonth = dashboard.getSpendingMonth();
            let spending = new Spending(spendingCategory, cost, name);

            spendingMonth.addSpending(spending);
            console.log("The spending " + name + " with a cost of " + cost + " was successfully added to the current month");
            inputGui.close();
            dashboard.open();
        });

        toggleDisplayVisibility(this.inputGuiElement, true);
    }

    openResetInput() {

        this.clear();

        let inputContainer = setHTMLElement(this.inputGuiElement, "div", "inputContainer");
        let imageDiv = setHTMLElement(inputContainer, "div", "spendingInputCategoryDiv");

        setHTMLElement(imageDiv, "img", "spendingInputImage").src = "./Resources/Icon_2.png";
        createTextElement(imageDiv, "Reset", "inputText");

        let formDiv = setHTMLElement(inputContainer, "div", "formDiv");
        let resetInputElement = setHTMLElement(formDiv, "input", "inputGuiInput");

        resetInputElement.setAttribute("type", "text");
        resetInputElement.placeholder = "type 'reset'";

        let errorTextElement = createTextElement(formDiv, "Please fill out the form and press 'submit'!");

        this.setButton("cancel", true, function () {
            inputGui.close();
            dashboard.open();
        });

        this.setButton("reset", true, function () {

            let reset = resetInputElement.value;

            if (reset == "") {
                updateTextElement(errorTextElement, "The input field has to be filled out!!!")
                return;
            }

            if (reset != "reset") {
                console.log("Please confirm the reset by typing in 'reset'!");
                return;
            }

            let spendingMonth = dashboard.getSpendingMonth();

            spendingMonth.setBudget(0);
            spendingMonth.getSpendings().clear();
            console.log("The current month was resetted!");
            inputGui.close();
            dashboard.open();
        });

        toggleDisplayVisibility(this.inputGuiElement, true);
    }
}


class InputGui {
    constructor(spendingMonth) {
        this.spendingMonth = spendingMonth;
        inputGui = this;
    }

    clear() {
        let inputGuiElement = document.getElementById("inputGui");
        let dashboardElement = document.getElementById("dashboard");

        clearElement(inputGuiElement);
        dashboard.clear();

        dashboardElement.style.overflow = "hidden";
        console.log("the input gui has been cleared!")
    }

    close() {
        let inputGuiElement = document.getElementById("inputGui");

        window.scrollTo({
            top: inputGui.offsetTop,
            left: 0,
            behavior: 'smooth'
        });

        toggleDisplayVisibility(inputGuiElement, false);
        this.clear();
    }

    setButton(text, fixedPosition, functionToCall) {

        let buttonSection = document.getElementById("buttonSection");
        let inputGuiElement = document.getElementById("inputGui");

        if (typeof (buttonSection) == 'undefined' || buttonSection == null) {
            buttonSection = setElement(inputGuiElement, "buttonSection", "buttonSection", "div");
        }

        if (fixedPosition) {
            buttonSection.classList.add("fixed");
        } else {
            buttonSection.classList.remove("fixed");
        }

        setTextButton(buttonSection, text, "buttonSectionButton", text, functionToCall);
    }

    openCategorySelector() {

        this.clear();

        let inputGuiElement = document.getElementById("inputGui");
        let container = setElement(inputGuiElement, "gridContainer", "", "div");

        for (let spendingCategory of spendingCategories) {

            let div = setElement(container, "", "categoryDiv", "div");
            let button = setButton(div, spendingCategory.getName() + "Button", "spendingCategoryButton", (function (variable) {
                return function () {
                    inputGui.openSpendingInput(variable);
                };
            })(spendingCategory));

            setElement(button, "", "categoryImage", "img").src = spendingCategory.getIconUrl();
            setParagraph(button, "", "categoryText", spendingCategory.getName())
        }

        this.setButton("cancel", false, function () {
            inputGui.close();
            dashboard.display();
        });

        toggleDisplayVisibility(inputGuiElement, true);
    }

    openBudgetInput() {

        this.clear();

        let inputGuiElement = document.getElementById("inputGui");
        let inputContainer = setElement(inputGuiElement, "", "inputContainer", "div");
        let imageDiv = setElement(inputContainer, "", "spendingInputCategoryDiv", "div");

        setElement(imageDiv, "", "spendingInputImage", "img").src = "./Resources/Money.png";
        setParagraph(imageDiv, "spendingInputText","", "Budget" );

        let formDiv = setElement(inputContainer, "", "formDiv", "div");
        let budgetInputElement = setElement(formDiv, "", "inputGuiInput", "input");
        budgetInputElement.setAttribute("type", "number");
        budgetInputElement.placeholder = "e.g. 1000";

        let errorTextElement = setParagraph(formDiv, "", "", "");

        this.setButton("cancel", true, function () {

            inputGui.close();
            dashboard.display();
        });

        this.setButton("submit", true, function () {

            let budget = budgetInputElement.value;

            if (budget == "") {
                errorTextElement.textContent = "The input field has to be filled out!!!";
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
            dashboard.display();
        });

        toggleDisplayVisibility(inputGuiElement, true);
    }

    openSpendingInput(spendingCategory) {

        this.clear();

        let inputGuiElement = document.getElementById("inputGui");
        let inputContainer = setElement(inputGuiElement, "", "inputContainer", "div");
        let imageDiv = setElement(inputContainer, "", "spendingInputCategoryDiv", "div");

        setElement(imageDiv, "", "spendingInputImage", "img").src = spendingCategory.getIconUrl();
        setParagraph(imageDiv, "", "inputText", spendingCategory.getName());

        let formDiv = setElement(inputContainer, "", "formDiv", "div");
        
        let costInputElement = setElement(formDiv, "", "inputGuiInput", "input");
        costInputElement.setAttribute("type", "number");
        costInputElement.placeholder = "0";

        let nameInputElement = setElement(formDiv, "", "inputGuiInput", "input");
        nameInputElement.setAttribute("maxlength", 20);
        nameInputElement.placeholder = "name";

        let errorTextElement = setParagraph(formDiv, "", "", "");

        this.setButton("cancel", true, function () {
            inputGui.close();
            dashboard.display();
        });

        this.setButton("submit", true, function () {

            let cost = costInputElement.value;
            let name = nameInputElement.value;

            if (cost == "" || name == "") {

                errorTextElement.textContent = "Both input fields have to be filled out!!!";
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
            dashboard.display();
        });

        toggleDisplayVisibility(inputGuiElement, true);
    }

    openResetInput() {

        this.clear();

        let inputGuiElement = document.getElementById("inputGui");
        let inputContainer = setElement(inputGuiElement, "div", "inputContainer");
        let imageDiv = setElement(inputContainer, "", "spendingInputCategoryDiv", "div");
        
        setElement(imageDiv, "", "spendingInputImage", "img").src = "./Resources/Icon_2.png";
        setParagraph(imageDiv, "", "inputText", "Reset");

        let formDiv = setElement(inputContainer, "", "formDiv", "div");

        let resetInputElement = setElement(formDiv, "", "inputGuiInput", "input");
        resetInputElement.setAttribute("type", "text");
        resetInputElement.placeholder = "type 'reset'";

        let errorTextElement = setParagraph(formDiv, "","", "");

        this.setButton("cancel", true, function () {
            inputGui.close();
            dashboard.display();
        });

        this.setButton("reset", true, function () {

            let reset = resetInputElement.value;

            if (reset == "") {
                errorTextElement.textContent = "The input field has to be filled out!!!";
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

        toggleDisplayVisibility(inputGuiElement, true);
    }
}


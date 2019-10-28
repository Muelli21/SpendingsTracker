class InputGui {
    constructor(spendingMonth) {
        this.spendingMonth = spendingMonth;
        this.inputGuiElement = document.getElementById("inputGui");
        inputGui = this;
    }

    clear() {
        clearElement(this.inputGuiElement);
    }

    close() {
        this.clear();
        toggleDisplayVisibility(this.inputGuiElement, false);
    }

    setButton(text, fixedPosition, functionToCall) {

        let buttonSection = document.getElementById("buttonSection");

        if(typeof(buttonSection) == 'undefined' || buttonSection == null){
            buttonSection = createHTMLElement(this.inputGuiElement, "div", "buttonSection");
            buttonSection.id = "buttonSection";
        }

        if(fixedPosition) {
            buttonSection.classList.add("fixed");
        } else {
            buttonSection.classList.remove("fixed");
        }

        createTextButtonElement(buttonSection, text, "buttonSectionButton", functionToCall);
    }

    openCategorySelector() {

        this.clear();

        let inputGuiElement = document.getElementById("inputGui");
        let flexContainer = createHTMLElement(inputGuiElement, "div", "flexContainer");

    
        for (let spendingCategory of spendingCategories) {
            let div = createHTMLElement(flexContainer, "div", "categoryDiv one-third");
            let button = createButtonElement(div, spendingCategory.getName() + "Button", "spendingCategoryButton", (function (variable) {
                return function () {
                    inputGui.openSpendingInput(variable);
                };
            })(spendingCategory));
    
            let labelElement = button[1];
            createHTMLElement(labelElement,"img", "categoryImage").src = spendingCategory.getIconUrl();
            createTextElement(labelElement, spendingCategory.getName(), "categoryText");
        }

        this.setButton("cancel", false, function() {
            inputGui.close();
            dashboard.open();
        });

        toggleDisplayVisibility(this.inputGuiElement, true);
    }

    openBudgetInput() {

        this.clear();

        let inputContainer = createHTMLElement(this.inputGuiElement, "div", "inputContainer");

        let imageDiv = createHTMLElement(inputContainer, "div", "spendingInputCategoryDiv");
        createHTMLElement(imageDiv,"img", "spendingInputImage").src = "./Resources/Icon.png";
        createTextElement(imageDiv, "Budget", "spendingInputText");

        let formDiv = createHTMLElement(inputContainer, "div", "formDiv");

        let budgetInputElement = createHTMLElement(formDiv,"input", "inputGuiInput");
        budgetInputElement.setAttribute("type", "number");
        budgetInputElement.placeholder = "e.g. 1000";

        let errorTextElement = createTextElement(formDiv, "Please fill out the form and press 'submit'!");

        this.setButton("cancel", true, function() {
            inputGui.close();
            dashboard.open();
        });

        this.setButton("submit", true, function() {
    
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
        
        let inputContainer = createHTMLElement(this.inputGuiElement, "div", "inputContainer");

        let imageDiv = createHTMLElement(inputContainer, "div", "spendingInputCategoryDiv");
        createHTMLElement(imageDiv,"img", "spendingInputImage").src = spendingCategory.getIconUrl();
        createTextElement(imageDiv, spendingCategory.getName(), "spendingInputText");
    
        let formDiv = createHTMLElement(inputContainer, "div", "formDiv");
        let costInputElement = createHTMLElement(formDiv,"input", "inputGuiInput");
        costInputElement.setAttribute("type", "number");
        costInputElement.placeholder = "0";
    
        let nameInputElement = createHTMLElement(formDiv,"input", "inputGuiInput");
        costInputElement.setAttribute("type", "text");
        nameInputElement.setAttribute("maxlength", 20);
        nameInputElement.placeholder = "name";

        let errorTextElement = createTextElement(formDiv, "Please fill out the form and press 'submit'!");

        this.setButton("cancel", true, function() {
            inputGui.close();
            dashboard.open();
        });

        this.setButton("submit", true, function() {

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
}


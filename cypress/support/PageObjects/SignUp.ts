// Common elements that can be used by many different pages
export const SignUpData = {
    Strings: {
        name: 'John',
        surname: 'Doe',
        email: 'john@doe.com',
        phone: '15134566788',
        company: 'Some text',
        tiktok: 'Tiktok'
    },
    Locators: {
        position1_2Btn: '[data-value="1-2"]',
        position3_5Btn: '[data-value="3-5"]',
        position6_10Btn: '[data-value="6-10"]',
        position11_15Btn: '[data-value="11-15"]',
        position16Btn: '[data-value="16+"]',
        eletronicBtn: '[data-value="electronic"]',
        mechanicBtn: '[data-value="installation-mechanic"]',
        continueBtn: '.continue-button',
        nameField: '#mat-input-1',
        surnameField: '#mat-input-2',
        emailField: '#mat-input-3',
        phoneField: '#mat-input-4',
        companyField: '#mat-input-5',
        socialDropdown: '.mat-form-field-infix.ng-tns-c2794762957-10',
        socialDropdownTiktokOption: '[data-value="tiktok"]',
        socialDropdownFacebookOption: '[data-value="facebook"]',
        confirmFormBtn: 'app-contact-information-step.ng-star-inserted > .content > .mat-focus-indicator',
        successImage: '.image',
        successTitle: '.content > .title',
        sucessCTABtn: '.content > .mat-focus-indicator'
    }
};

//Common methods
export const SignUpMethods = {
    selectCardbyDataValue: (locator) => {
        cy.get(locator).click();
    },
    fillForm: (name, surname, email, phone, company, media) => {
        cy.get(SignUpData.Locators.nameField).type(name);
        cy.get(SignUpData.Locators.surnameField).type(surname);
        cy.get(SignUpData.Locators.emailField).type(email);
        cy.get(SignUpData.Locators.phoneField).type(phone);
        cy.get(SignUpData.Locators.companyField).type(company);
        cy.get(SignUpData.Locators.socialDropdown).click()
        .then(() => {
            switch(media)
            {
                case 'Tiktok':
                    cy.get(SignUpData.Locators.socialDropdownTiktokOption).click();
                    break;
                case 'Facebook':
                    cy.get(SignUpData.Locators.socialDropdownFacebookOption).click();
                    break;
                //And so on...
            };
        });
    },
    listenToAPIFormResponse: () => {
        cy.intercept(
            {
              method: 'POST',
              url: 'https://api.testing.powerus.de/companies/company-contact'
            },
            []
        ).as('formAPI');
    },
    verifySuccessfulFormBody: (alias) => {
        cy.wait(`@${alias}`).then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            const responseBody = interception.response.body;
            expect(responseBody).to.have.property('id').and.not.to.be.empty;
        })
    }
};
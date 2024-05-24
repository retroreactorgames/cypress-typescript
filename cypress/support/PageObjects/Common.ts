// Common elements that can be used by many different pages
export const CommonData = {
    URLs: {
        baseUrl: 'https://testing.powerus.de'
    },
    Locators: {
        menuButton: 'button[aria-label="Menü öffnen"]',
        menu: '.container.ng-star-inserted.is-open',
        menuOptions: '.nav-list-container',
    }
};

//Common methods
export const CommonMethods = {
    //Might not be the best way... position can change... 
    //I thought I could get by text, but text can also change...
    //Ended up choosing number by scalability
    selectMenuOptionByNumber: (number) => {
      cy.get(CommonData.Locators.menuOptions).children().eq(number).click();
    }
};


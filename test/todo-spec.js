describe('HyperTech Home Page', function() {
    var svcTab = element(by.binding('servicestab'));
    var svcDetail = element(by.id('svcdetail'));

    it('should have a title', function() {
        browser.get("http://localhost:8080");

        expect(browser.getTitle()).toEqual('HyperTech ACS');        

        // browser.get('https://angularjs.org');

        // element(by.model('todoList.todoText')).sendKeys('write first protractor test');
        // element(by.css('[value="add"]')).click();

        // var todoList = element.all(by.repeater('todo in todoList.todos'));
        // expect(todoList.count()).toEqual(3);
        // expect(todoList.get(2).getText()).toEqual('write first protractor test');

        // // You wrote your first test, cross it off the list
        // todoList.get(2).element(by.css('input')).click();
        // var completedAmount = element.all(by.css('.done-true'));
        // expect(completedAmount.count()).toEqual(2);
    });

    it('should have 2 servicetabs', function(){
        element.all(by.css('.nav-tabs li')).then(function(items){
            expect(items.length).toBe(2);
        });
    });

    it('aircon service type has service cards', function(){
        expect($('.card').isPresent()).toBeTruthy();
    });

    // it('cctv service type has service cards', function(){
    //     element.all(by.css('.nav-tabs li')).then(function(items){
    //         expect(items.length).toBe(2);
    //     });
    // });

    it('should not show svc details when no hashtag', function(){
        expect(svcDetail.getAttribute('class')).toMatch('ng-hide');
    });
});
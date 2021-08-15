describe("Website homepage tests", () => {
	it("should have all proper elements of the layout", () => {
		cy.visit("https://statusupdate.vercel.app/");
		
		// Page Title
		cy.title().should("contain", "AboutMe");
		// Login button
		expect(cy.contains("Login")).to.not.equal(null);
		// Homepage Main Image
		expect(cy.get("img")).to.not.equal(null);
	});
});

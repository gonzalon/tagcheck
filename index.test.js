const assert = require("assert");
const checkTags = require("./index");

describe("test tag checker", () => {

  it("Correctly nested - Inner tags", () => {
    // Given
    const value = "The following text<C><B>is centred and in boldface</B></C>";
    const expected = "Correctly tagged paragraph";

    // Then
    const actual = checkTags(value);

    // Should
    assert.deepStrictEqual(actual, expected);
  });

  it("Correctly nested - Not upper case tag", () => {
    // Given
    const value = `<B>This <\g>is <B>boldface</B> in <<*> a</B> <\\6> <<d>sentence`;
    const expected = "Correctly tagged paragraph";

    // Then
    const actual = checkTags(value);

    // Should
    assert.deepStrictEqual(actual, expected);
  });

  it("Incorrectly nested - Wrong order", () => {
    // Given
    const value = "<B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>";
    const expected = `Expected </C> found </B>`;

    // Then
    const actual = checkTags(value);

    // Should
    assert.deepStrictEqual(actual, expected);
  });

  it("Incorrectly nested - Missing open tag", () => {
    // Given
    const value = "<B>This should be in boldface, but there is an extra closing tag</B></C>";
    const expected = `Expected # found </C>`;

    // Then
    const actual = checkTags(value);

    // Should
    assert.deepStrictEqual(actual, expected);
  });

  it("Incorrectly nested - Missing closing tag", () => {
    // Given
    const value = "<B><C>This should be centred and in boldface, but there is a missing closing tag</C>";
    const expected = `Expected </B> found #`;

    // Then
    const actual = checkTags(value);

    // Should
    assert.deepStrictEqual(actual, expected);
  });

});

import ext from "../ext";

describe("property panel app chaining selection transfer", () => {
  const getCategoryItems = () => {
    const extension = ext({} as any, {} as any, {} as any) as any;
    return extension.definition.items.navigation.items.categories.items;
  };

  it("shows selection transfer controls only for app chaining items", () => {
    const items = getCategoryItems();

    expect(items.limitSelectionTransfer.show({ navigation: "goToApp", showNavigation: true })).toBe(true);
    expect(items.selectionTransferFields.show({
      navigation: "goToApp",
      showNavigation: true,
      limitSelectionTransfer: true,
    })).toBe(true);
    expect(items.selectionTransferFields.show({
      navigation: "goToApp",
      showNavigation: true,
      limitSelectionTransfer: false,
    })).toBe(false);
    expect(items.limitSelectionTransfer.show({ navigation: "goToWebsite", showNavigation: true })).toBe(false);
    expect(items.limitSelectionTransfer.show({ navigation: "goToApp", showNavigation: false })).toBe(false);
    expect(items.selectionTransferFields.items.send).toBeUndefined();
  });

  it("populates selection transfer field options from the app field list", async () => {
    const items = getCategoryItems();
    const app = {
      getFieldList: jest.fn().mockResolvedValue([{ qName: "Country" }, { qName: "Year" }]),
    };

    await expect(items.selectionTransferFields.items.field.options({}, { app })).resolves.toEqual([
      { label: "Country", value: "Country" },
      { label: "Year", value: "Year" },
    ]);
  });

  it("returns no field options when no app is available", async () => {
    const items = getCategoryItems();

    await expect(items.selectionTransferFields.items.field.options({}, {})).resolves.toEqual([]);
  });
});

import { stardust } from "@nebula.js/stardust";
import { mock } from "jest-mock-extended";

jest.mock("@qlik-trial/sprout/icons/react", () => ({}));
jest.mock("@qlik-trial/sprout/theme/theme", () => () => ({}));
jest.mock("../index.css", () => ({}));

import supernova from "..";

const fakeTheme = mock<stardust.Theme>();
fakeTheme.getColorPickerColor.mockReturnValue("black");

describe("first test", () => {
  it("should load index", () => {
    const fakeGalaxy = mock<stardust.Galaxy>();
    const shape = supernova(fakeGalaxy);
    expect(shape).toBeDefined();
  });
});

describe("attributes test", () => {
  
});

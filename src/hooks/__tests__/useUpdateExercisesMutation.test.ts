import { act, renderHook, waitFor } from "@testing-library/react-native";
import { useUpdateExercisesMutation } from "../useUpdateExercisesMutation";
import { AllTheProviders } from "../../test-utils";
import workoutFolderService from "../../services/workoutFolders";

describe("useUpdateExercisesMutation", () => {
  it("returns an object with a mutation function", () => {
    const folderId = "folder-id";
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();

    const { result } = renderHook(() =>
      useUpdateExercisesMutation(folderId, onSuccessCallback, onErrorCallback),
      { wrapper: AllTheProviders }
    );

    expect(result.current.mutate).toBeInstanceOf(Function);
  });

  it("calls the onSuccess callback when the mutation is successful", async () => {
    const folderId = "folder-id";
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();

    jest.spyOn(workoutFolderService, "updateExercises").mockImplementationOnce(() => {
      return {
        id: "folder-id",
        name: "New Folder",
        exercises: ["1", "2"],
      } as never;
    });

    const { result, unmount } = renderHook(() =>
      useUpdateExercisesMutation(folderId, onSuccessCallback, onErrorCallback),
      { wrapper: AllTheProviders }
    );

    await act(async () => {
      await result.current.mutateAsync(["1", "2"]);
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });
  
    unmount();
  });

  it("calls the onError callback when the mutation fails", async () => {
    const folderId = "folder-id";
    const onSuccessCallback = jest.fn();
    const onErrorCallback = jest.fn();

    const { result, unmount } = renderHook(() =>
      useUpdateExercisesMutation(folderId, onSuccessCallback, onErrorCallback),
      { wrapper: AllTheProviders }
    );

    jest.spyOn(workoutFolderService, "updateExercises").mockImplementationOnce(() => {
      throw new Error("Failed to update exercises") as never;
    });

    await act(async () => {
      await result.current.mutateAsync(["1", "2"]).catch(() => {});
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
      expect(onErrorCallback).toHaveBeenCalled();
    });

    unmount();
  });
});
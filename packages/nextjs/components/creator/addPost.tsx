import React, { useState } from "react";
import { usePostManage } from "~~/hooks/post/usePostManage";

export const AddPost = () => {
    const [showModal, setShowModal] = useState(false);
    const { isLoading, handleChange, handleSubmit, creatorPost } = usePostManage();

    return (
        <div className="text-left">
            <button
                onClick={() => {
                    setShowModal(true);
                }}
                className="btn btn-info px-4 btn-sm"
            >
                Add a post
            </button>
            {showModal && (
                <dialog className="modal modal-open">
                    <div className="modal-box flex flex-col gap-4">
                        <h3 className="font-bold text-lg">Add Post</h3>

                        <h4 className="text-xl">Post title</h4>
                        <input
                            value={creatorPost.title ?? ""}
                            onChange={handleChange("title")}
                            className="input w-full bg-opacity-50 border-primary border-opacity-30"
                            placeholder="title"
                        />
                        <h4 className="text-xl">Description</h4>
                        <textarea
                            value={creatorPost.description ?? ""}
                            onChange={handleChange("description")}
                            className="textarea w-full bg-opacity-25 rounded-md border border-primary border-opacity-30"
                            rows={4}
                            placeholder="description"
                        />

                        <div className="modal-action">
                            <form method="dialog">
                                <button className="btn" onClick={() => setShowModal(false)}>
                                    Close
                                </button>
                                <button
                                    disabled={isLoading}
                                    className="btn btn-secondary"
                                    onClick={() => handleSubmit(() => setShowModal(false))}
                                >
                                    {isLoading && <span className="loading loading-spinner "></span>}
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

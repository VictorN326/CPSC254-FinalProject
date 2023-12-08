"use client";
import React, { FormEvent, Fragment } from "react";
import { useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { set } from "mongoose";
import Image from "next/image";
import { addUserEmail } from "@/lib/actions";
interface Props {
  productId: string;
}
const Modal = ({ productId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    //add user email to product
    await addUserEmail(productId, email);

    setIsSubmitting(false);
    setEmail("");
    closeModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button type="button" className="btn" onClick={openModal}>
        Track Price
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          open={isOpen}
          onClose={closeModal}
          className="dialog-container"
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              opacity-0
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="dialog-content">
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <Image
                      className="cursor-pointer"
                      src="/x-close.svg"
                      alt="close"
                      width={24}
                      height={24}
                      onClick={closeModal}
                    />
                  </div>
                  <h4 className="dialog-head_text">
                    Get alerted through your inbox when there is a change of
                    price!
                  </h4>
                </div>
                <form className="flex flex-col mt-5" onSubmit={handleSubmit}>
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="dialog-input_container">
                    <Image src="/mail.svg" alt="email" width={18} height={18} />
                    <input
                      required
                      type="email"
                      id="email"
                      placeholder="Enter your email address"
                      className="dialog-input"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" className="dialog-btn">
                    {isSubmitting ? "Submitting!" : "Track!"}
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;

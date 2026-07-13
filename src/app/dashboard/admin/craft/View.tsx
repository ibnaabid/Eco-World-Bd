"use client";

import React, { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

interface PropertyItem {
  _id: string;
  productName?: string;
  pickupAddress?: string;
  price?: string | number;
}

interface EditBtnProps {
  product: PropertyItem;
}

interface FormState {
  productName: string;
  pickupAddress: string;
  price: string | number;
}

const EditBtn: React.FC<EditBtnProps> = ({ product }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [form, setForm] = useState<FormState>({
    productName: product?.productName || "",
    pickupAddress: product?.pickupAddress || "",
    price: product?.price || "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`http://localhost:5000/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: form.productName,
          pickupAddress: form.pickupAddress,
          price: Number(form.price),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Product updated successfully!");
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger Button */}
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-[#141416] text-white border border-white/10 rounded-2xl">
            <Modal.CloseTrigger />

            {/* Header */}
            <Modal.Header>
              <Modal.Heading className="text-lg font-bold">Edit Product</Modal.Heading>
              <p className="mt-1.5 text-xs text-zinc-400 font-normal">
                Update your product details
              </p>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="p-6">
              <Surface className="bg-transparent">
                <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
                  <TextField>
                    <Label className="text-zinc-400 text-xs font-medium">Product Title</Label>
                    <Input
                      name="productName"
                      value={form.productName}
                      onChange={handleChange}
                      placeholder="Enter product name"
                      className="bg-[#1F1F21] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none w-full"
                    />
                  </TextField>

                  <TextField>
                    <Label className="text-zinc-400 text-xs font-medium">Pickup Address</Label>
                    <Input
                      name="pickupAddress"
                      value={form.pickupAddress}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="bg-[#1F1F21] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none w-full"
                    />
                  </TextField>

                  <TextField>
                    <Label className="text-zinc-400 text-xs font-medium">Price (BDT)</Label>
                    <Input
                      name="price"
                      type="number"
                      value={form.price}
                      onChange={handleChange}
                      placeholder="Enter price"
                      className="bg-[#1F1F21] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none w-full"
                    />
                  </TextField>
                </form>
              </Surface>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="flex justify-end gap-3 p-6 pt-0">
              <Button 
                variant="secondary" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>

              <Button 
                isDisabled={isSaving}           // ← Fixed: Use isDisabled instead of disabled
                onClick={handleUpdate}
                className="bg-[#C9A876] hover:bg-[#DFBE8C] text-black font-semibold px-5 py-2 rounded-xl transition-all"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditBtn;
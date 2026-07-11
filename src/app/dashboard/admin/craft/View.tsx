"use client";

import React, { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

// প্রোডাক্ট বা আইটেম ইন্টারফেস
interface PropertyItem {
  _id: string;
  productName?: string;
  pickupAddress?: string;
  price?: string | number;
}

interface EditBtnProps {
  item: PropertyItem;
}

interface FormState {
  productName: string;
  pickupAddress: string;
  price: string | number;
}

const EditBtn: React.FC<EditBtnProps> = ({ item }) => {
  const [form, setForm] = useState<FormState>({
    title: item?.productName || "",
    location: item?.pickupAddress || "",
    price: item?.price || "",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (closeModal: () => void) => {
    setIsSaving(true);
    try {
      // 🚀 আপনার নির্দিষ্ট করা এপিআই এন্ডপয়েন্ট: localhost:5000/products
      const res = await fetch(
        `http://localhost:5000/products/${product._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: form.productName,
            location: form.pickupAddress,
            price: Number(form.price), // প্রাইজ নম্বর ফরম্যাটে কনভার্ট করা হলো
          }),
        }
      );

      const data = await res.json();

      if (res.ok && (data.modifiedCount > 0 || data.acknowledged)) {
        toast.success("Property updated successfully");
        closeModal(); // আপডেট সফল হলে মোডাল বন্ধ হবে
        window.location.reload(); // পেজ রিফ্রেশ করবে
      } else {
        toast.error("No changes detected");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal>
      {/* OPEN BUTTON */}
      <Button variant="secondary">
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          {/* @ts-ignore - HeroUI close event handler inject */}
          {({ close }) => (
            <Modal.Dialog className="sm:max-w-md bg-[#141416] text-white border border-white/10 rounded-2xl">
              <Modal.CloseTrigger />

              {/* HEADER */}
              <Modal.Header>
                <Modal.Heading className="text-lg font-bold">Edit Property</Modal.Heading>
                <p className="mt-1.5 text-xs text-zinc-400">
                  Update your property details
                </p>
              </Modal.Header>

              {/* BODY */}
              <Modal.Body className="p-6">
                <Surface className="bg-transparent">
                  <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>

                    {/* TITLE */}
                    <TextField>
                      <Label className="text-zinc-400 text-xs font-medium">Title</Label>
                      <Input
                        name="title"
                        value={form.productName} // ফিক্সড: form.productName থেকে form.title এ পরিবর্তন
                        onChange={handleChange}
                        placeholder="Enter title"
                        className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none"
                      />
                    </TextField>

                    {/* LOCATION */}
                    <TextField>
                      <Label className="text-zinc-400 text-xs font-medium">Location</Label>
                      <Input
                        name="location"
                        value={form.pickupAddress} // ফিক্সড: form.pickupAddress থেকে form.location এ পরিবর্তন
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none"
                      />
                    </TextField>

                    {/* PRICE */}
                    <TextField>
                      <Label className="text-zinc-400 text-xs font-medium">Price (TK)</Label>
                      <Input
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="bg-zinc-900 border border-white/10 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none"
                      />
                    </TextField>

                  </form>
                </Surface>
              </Modal.Body>

              {/* FOOTER */}
              <Modal.Footer className="flex justify-end gap-2">
                <Button slot="close" variant="secondary" className="text-xs font-medium">
                  Cancel
                </Button>

                <Button 
                  disabled={isSaving}
                  onClick={() => handleUpdate(close)}
                  className="bg-[#C9A876] hover:bg-[#DFBE8C] text-black text-xs font-bold px-4 py-2 rounded-xl transition-all"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </Modal.Footer>

            </Modal.Dialog>
          )}
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default EditBtn;
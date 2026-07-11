"use client";

import React, { useState, ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";

// Property item model interface
interface PropertyItem {
  _id: string;
  productName?: string;
  pickupAddress?: string;
  price?: string | number;
}

interface EditBtnProps {
  product: PropertyItem; // Fixed: Prop validation structure matches incoming data
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

  // 🎯 Fixed: Matching form state fields strictly with interface types
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
      // 🚀 Endpoint matching structural mapping
      const res = await fetch(`http://localhost:5000/products/${product._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: form.productName,   // 🎯 Fixed: Passing schema keys instead of title
          pickupAddress: form.pickupAddress, // 🎯 Fixed: Passing schema keys instead of location
          price: Number(form.price),
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Property updated successfully");
        setIsOpen(false); // Modal dismiss tracker
        
        // 🔄 Realtime Next.js Dynamic Client Router Pipe Refresh Tracker
        router.refresh(); 
      } else {
        toast.error(data.message || "No changes detected");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Update failed");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen}>
      {/* OPEN TRIGGER */}
      <Button variant="secondary" onClick={() => setIsOpen(true)}>
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md bg-[#141416] text-green-600 font-bold border border-white/10 rounded-2xl">
            <Modal.CloseTrigger />

            {/* HEADER */}
            <Modal.Header>
              <Modal.Heading className="text-lg font-bold">Edit Property</Modal.Heading>
              <p className="mt-1.5 text-xs text-zinc-400 font-normal">
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
                      name="productName" // 🎯 Fixed: Name aligned with State Key
                      value={form.productName}
                      onChange={handleChange}
                      placeholder="Enter title"
                      className="bg-green-900 border border-white/10 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none w-full text-white"
                    />
                  </TextField>

                  {/* LOCATION */}
                  <TextField>
                    <Label className="text-zinc-400 text-xs font-medium">Location</Label>
                    <Input
                      name="pickupAddress" // 🎯 Fixed: Name aligned with State Key
                      value={form.pickupAddress}
                      onChange={handleChange}
                      placeholder="Enter address"
                      className="bg-green-900 border border-white/10 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none w-full text-white"
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
                      className="bg-green-900 border border-white/10 rounded-xl px-3 py-2 text-sm mt-1 focus:outline-none w-full text-white"
                    />
                  </TextField>

                </form>
              </Surface>
            </Modal.Body>

            {/* FOOTER */}
            <Modal.Footer className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setIsOpen(false)} className="text-xs font-medium">
                Cancel
              </Button>

              <Button 
                disabled={isSaving}
                onClick={handleUpdate}
                className="bg-[#C9A876] hover:bg-[#DFBE8C] text-black text-xs font-bold px-4 py-2 rounded-xl transition-all"
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
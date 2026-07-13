"use client";

import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";

interface Product {
  _id: string;
  productName: string;
}

interface DeleteProductDialogProps {
  product: Product;
}

export default function DeleteProductDialog({
  product,
}: DeleteProductDialogProps) {
  const handleDelete = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/products/${product._id}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Product deleted successfully!");
        window.location.reload();
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <AlertDialog>
      {/* Fixed Trigger Button */}
      <Button 
        
        variant="ghost"           // Changed from "flat"
        className="bg-red-600 hover:bg-red-700 text-white"
      >
        <Trash2 size={18} />
        Delete
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-md">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Product?</AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              Are you sure you want to delete <strong>{product.productName}</strong>? 
              <br />
              This action cannot be undone.
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="ghost">
                Cancel
              </Button>

              <Button className="bg-red-500"
                
                onClick={handleDelete}
              >
                Yes, Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
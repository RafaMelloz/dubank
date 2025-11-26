import { LucideCheck, LucideX } from "lucide-react";
import toast from "react-hot-toast";

export const successToast = (message: string) => {
    toast.success(message, {
        duration: 2000,
    });
}

export const errorToast = (message: string) => {
    toast.error(message, {
        duration: 2000,
    });
}

export const confirmToast = (message: string, confirmFunction: () => void) => {
    toast((t) => (
        <div>
            <p>{message}</p>

            <div className="flex justify-between gap-2 mt-5">
                <button className="text-white bg-vermelho-900 rounded w-full flex justify-center items-center" onClick={() => toast.dismiss(t.id)}>
                    <LucideX size={22} />
                </button>

                <button className="text-white bg-verde-900 rounded w-full flex justify-center items-center" onClick={() => {
                    confirmFunction(); // Executa a função de confirmação
                    toast.dismiss(t.id); // Fecha o alerta
                }}>
                    <LucideCheck size={22} />
                </button>
            </div>
        </div>
    ),
        {
            position: 'top-right',
            duration: 5000
        }
    ); 
};

export const loadingAlert = (messageLoading: string, messageSuccess: string, messageError: string, promise: Promise<any>) => {
    toast.promise(promise,
        {
            loading: messageLoading,
            success: (data) => messageSuccess,
            error: (err) => messageError,
        },
        {
            position: 'top-right'
        }
    );
}
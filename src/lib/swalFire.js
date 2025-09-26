import Swal from "sweetalert2";

export default function swalFire() {
    const confirmAction = async () => {
        const result = Swal.fire({
            title: "Tem certeza?",
            text: "Esta ação não poderá ser revertida",
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            showConfirmButton: true,
            confirmButtonText: 'Confirmar'
        });

        return result;
    }

    return {confirmAction};
}
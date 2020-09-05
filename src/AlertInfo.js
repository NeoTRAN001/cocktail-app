class AlertInfo {
    showModal(data) {
        Swal.fire({
            title: data[0].name,
            text: data[0].category,
            footer: data[0].ingredients,
            imageUrl: data[0].img,
            imageWidth: '200px',
            backdrop: false
        });
    }

    errorModal(message = 'Nop') {
        Swal.fire({
            title: message,
            icon: 'error'
        });
    }

    successModal(message) {
        Swal.fire({
            title: message,
            icon: 'success'
        });
    }
}

export default AlertInfo;
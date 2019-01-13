import swal from 'sweetalert';

export class Shared {
    alert(title: string, text: string, icon: string) {
        swal({
            title: title,
            text: text,
            icon: icon
        });
    }
}
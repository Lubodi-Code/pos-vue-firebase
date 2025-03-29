import { ref, computed,  } from "vue";
import { useFirebaseStorage } from "vuefire";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { uid } from "uid";

export default function useImage() {
    
    const url = ref('');

    const storage = useFirebaseStorage();




    // 👇 Declaras el computed afuera para que exista siempre
    const isImageUploaded = computed(() => {
        return url.value ? url.value : null;
    });

    const onFileChange = (e) => {
        const file = e.target.files[0];
        const filename = uid() + '.jpg';
        const sRef = storageRef(storage, `/products/${filename}`);

        // Upload file
        const uploadTask = uploadBytesResumable(sRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                console.error(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    url.value = downloadURL;
                });
            }
        );
    };
    
    return {
        url,
        onFileChange,
        isImageUploaded,
    };
}

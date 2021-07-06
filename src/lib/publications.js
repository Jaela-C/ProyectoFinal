import { db, auth } from '../../firebase/initFirebase'
import { useUser } from '../../firebase/useUser'
import { useState, useEffect } from 'react';

const ReadDataFromCloudFirestore = () => {
    const [dataPublications, setDataPublications] = useState();
    const userUid = auth.currentUser;
    const readData = () => {
        try {
            db
            .collection('foundations').doc(userUid.uid)
            .collection('publications')
            .onSnapshot(publication => {
              const publications = [];
              publication.forEach(doc => {
                publications.push({ id: doc.id, ...doc.data()})
              });
              setDataPublications(publications);
              console.log('Publicaciones', publications)
              console.log('Usuario', useUser)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return { readData };
}

export { ReadDataFromCloudFirestore }
import { useContext, useEffect } from 'react'
import { SpotifyContext } from '../../context/context'
import { ref, set, onValue } from "firebase/database";
import { db } from "../../components/firebase"

const TableRow = ({ props, likedcheck }) => {
  const { playOnSelect } = useContext(SpotifyContext)
  let data = { views: 0, length: 0 };
  const viewsCountRef = ref(db, 'songsviews/' + props.title);
  onValue(viewsCountRef, (snapshot) => {
    data = snapshot.val();
    if (data == undefined) data = { views: 0, length: "0:00" };
  });

  let islike = false;
  const likeref = ref(db, 'songsliked/' + props.title)
  onValue(likeref, (snapshot) => {
    islike = snapshot.val();
    if(islike == undefined) islike = false;
    else islike = islike.liked
  })

  return (
    <tbody style={{display: likedcheck ? (islike ? "" : "none") : ""}}>
      <tr onClick={() => playOnSelect(props)}>
        <th className={styles.th}>{props.index}</th>
        <th className={styles.th}>
          <div>
            <p className="font-bold">{props.title}</p>
            <p className="opacity-50">{'artist'}</p>
            {/* <p className="opacity-50">{props.artiste}</p> */}
          </div>
        </th>
        {/* <th className={styles.th}>{'10,000'}</th> */}
        <th className={styles.th}>{data.views}</th>
        {/* <th className={styles.th}>{'2:43'}</th> */}
        <th className={styles.th}>{data.length}</th>
      </tr>
    </tbody>
  )
}

export default TableRow

const styles = {
  th: `pb-5 hover:opacity-50 cursor-pointer`,
}

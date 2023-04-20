import React, { useEffect, useState } from 'react';
import classes from './index.module.css';

export type Type = {
  blockType: 'instagram'
  blockName?: string
  apiUrl: string
}

export const Instagram: React.FC<Type> = ({
  apiUrl,
}) =>{
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLoaded(false)
      const data = await fetch(apiUrl).then((res) => res.json());
      setData(data);
      setLoaded(true)
    })();
  }, [apiUrl]);
              
  return loaded ? (
    <div className={classes.container}>
    { data.map((item: any) => (
      <div
        key={item.id}
        className={classes.item}
        onClick={() => window.open(item.permalink, '_blank')}
      >
        <div>
          <img src={item.mediaUrl} alt={item.caption} />
        </div>
        <p className={classes.caption}>{item.caption}</p>
      </div>
    ))}

    </div>
  ) : (
    <div className={classes.container}>
      <div className={classes.loader} />
    </div>
  )
};

export default Instagram;
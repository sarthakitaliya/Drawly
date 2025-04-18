import { useSocketStore } from "@repo/store";

export default function OtherCursors() {
  const { OtherCursors } = useSocketStore();
  return (
    <>
      {Object.entries(OtherCursors).map(([id, cursor]) => (
        <div
          key={id}
          style={{
            position: 'absolute',
            left: cursor.x ,
            top: cursor.y ,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={cursor.color}>
            <path d="M2,2 L20,12 L13,13 L12,20 z" /> 
          </svg>
          <div style={{
            fontSize: '12px',
            color: 'black',
            background: cursor.color,
            padding: '1px 4px',
            borderRadius: '4px',
            marginTop: '2px',
          }}>{cursor.userName}</div>
        </div>
      ))}
    </>
  );
}

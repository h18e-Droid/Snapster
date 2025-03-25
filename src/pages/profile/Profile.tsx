const Profile = () => {
  return (
    <>
      {Array.from({ length: 50 }).map((el, i) => {
        return <div key={i}>{i}</div>
      })}
    </>
  )
}

export default Profile

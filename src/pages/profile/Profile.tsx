const Profile = () => {
  return (
    <div>
      {Array.from({ length: 200 }).map((_, i) => (
        <div key={i}>{i}</div>
      ))}
    </div>
  )
}

export default Profile

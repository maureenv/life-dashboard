export const uploadFile = ( id, file ) => {
  const formData = new FormData()
  formData.append( "file", file )
  formData.append( "id", id )

  const headers = {
    method: "POST",
    body: formData,
  }

  const image = fetch('http://127.0.0.1:3001/upload', headers )
  .then( response => response.blob() )
  .then( data => data )
  .catch( err => console.log( err, 'the error' ))
  return image
}

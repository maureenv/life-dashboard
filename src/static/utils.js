
export function camelCaseify( val ) {
  const _camelCaseify = val => {
    if ( val == null ) {
      return val
    }
    if ( Array.isArray( val )) {
      return val.map( v => _camelCaseify( v ))
    }
    if ( typeof val === 'object' ) {
      const newVal = {}
      for ( let k in val ) {
        const v = val[k]
        if ( k === "_id" ) {
          k = "id"
        }
        else {
          k = k.replace( /_(\w)/g, s => s[1].toUpperCase())
        }
        newVal[k] = _camelCaseify( v )
      }

      return newVal
    }
    else {
      return val
    }
  }

  return _camelCaseify( val )
}


export function snakeCaseify( val ) {
  const _snakeCaseify = val => {
    if ( val == null ) {
      return val
    }
    if ( Array.isArray( val )) {
      return val.map( v => _snakeCaseify( v ))
    }
    if ( typeof val === 'object' ) {
      const newVal = {}
      for ( let k in val ) {
        const v = val[k]
        if ( k === "id" ) {
          k = "_id"
        }
        else {
          k = k.replace( /([A-Z])/g, '_$1' ).toLowerCase()
        }
        newVal[k] = _snakeCaseify( v )
      }

      return newVal
    }
    else {
      return val
    }
  }

  return _snakeCaseify( val )
}

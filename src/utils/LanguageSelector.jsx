import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { BsTranslate } from 'react-icons/bs';
const languages = [
    {code: "en", lang: "English"},
    {code: "ar", lang: "العربية"},
]

const LanguageSelector = () => {
  const {i18n} = useTranslation();

  const changeLanguage = ()=>{
    if(languages[0].code===i18n.language){
      i18n.changeLanguage(languages[1].code)
    } else {
      i18n.changeLanguage(languages[0].code)
    }
  }
  useEffect(()=>{
    document.body.dir=i18n.dir()
  }, [i18n, i18n.language])
  return (
    <div>
      <button onClick={changeLanguage} className='flex bg-white'>
        {languages[0].code===i18n.language?languages[0].lang:languages[1].lang}
        <BsTranslate className='ms-3 size-5'/>
      </button>
    </div>
  )
}

export default LanguageSelector
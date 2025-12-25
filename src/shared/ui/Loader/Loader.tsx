import s from './Loader.module.scss'

export const Loader = () => {
  return (
    <div className={s.loader}>
      <span className={s.loaderSpan}></span>
    </div>
  )
}

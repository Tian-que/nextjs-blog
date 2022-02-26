import MyHeader from './header/myheader.js'
import MyFooter from './footer/footer.js'

export default function Layout({ children}) {
  return (
    <>
      <MyHeader />
        <main>
          {children}
        </main>
      <MyFooter />
    </>
  )
}
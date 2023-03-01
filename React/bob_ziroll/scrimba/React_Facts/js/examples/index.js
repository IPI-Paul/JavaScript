const ReApp = async () => {
  const root = document.getElementById('root')
  const render = ReactDOM.render
  render(null, root)
  if(ex === 'ex01') {
    render(
      <h1>Hello, everyone</h1>
      ,root
    )
  } else if(ex === 'ex02') {
    render(
      <p>Hi, my name is Bob!</p>
      ,root
    )
  } else if(ex === 'ex03') {
    render(
      <ul>
        <li>Babel Version: {Babel.version}</li>
        <li>React Version: {React.version}</li>
        <li>React-Dom Version: {ReactDOM.version}</li>
      </ul>
      ,root
    )
  } else if(ex === 'ex04') {
    import('./js/navbar/index.mjs')
      .then((module) => {
        const Navbar = () => HTMLReactParser(module.Navbar())
        const MainContent = () => HTMLReactParser(module.MainContent())
        render(
          <>
            <Navbar />
            <MainContent />
          </>
          ,root
        )
      })
  } else if(ex === 'ex05') {
    const h1 = document.createElement('h1')
    h1.textContent = 'This is an imperative way to program'
    h1.className = 'header'
    root.appendChild(h1);
    console.log(h1);
  } else if(ex === 'ex06') {
    const element = <h1 className='header'>This is JSX</h1>
    console.log(element)
    render(element, root)
  } else if(ex === 'ex07') {
    const page = (
      <>
        <h1 className='header'>This is JSX</h1>
        <p>This is a paragraph</p>
      </>
    )
    render(page, root)
  } else if(ex === 'ex08') {
    const navbar = (
      <nav>
        <h1>Bob's Bistro</h1>
        <ul>
          <li>Menu</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </nav>
    )
    render(navbar, root)
  } else if(ex === 'ex09') {
    import('./js/append/index.mjs')
      .then((module) => {
        render(
          HTMLReactParser(module.page)
          ,root
        )
      })
  } else if(ex === 'ex10') {
    import('./js/facts/index.mjs')
      .then((module) => {
        render(
          HTMLReactParser(module.page)
          ,root
        )
      })
  } else if(ex === 'ex11') {
    import('./js/reasons/index.mjs')
      .then((module) => {
        const Page = () => HTMLReactParser(module.Page())
        render(
          <Page />
          ,root
        )
      })
  } else if(ex === 'ex12') {
    // import('./js/components/index.mjs')
    //   .then((module) => {
    //     const Page = () => HTMLReactParser(module.Page())
    //     render(
    //       <Page />
    //       ,root
    //     )
    //   })
      Promise.all([
        import('./js/components/header.mjs'),
        import('./js/components/main-content.mjs'),
        import('./js/components/footer.mjs'),
      ])
        .then(([header, main, footer]) => {
          const Header = () => HTMLReactParser(header.Header())
          const MainContent = () => HTMLReactParser(main.MainContent())
          const Footer = () => HTMLReactParser(footer.Footer())
          render(
            <>
              <Header />
              <MainContent />
              <Footer />
            </>
            ,root
          )
        })      
  }
}
globalThis.ReApp = ReApp
ReApp()
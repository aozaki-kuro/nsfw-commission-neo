
const Footer = () => {
  return (
    <div id="--------Footer--------">
      <div className="pt-4" />
      <hr />
      <div className="pb-8" />

      {/* The disclaimers about copyrights */}
      <div className="pb-10 text-center text-xs">
        <p className="pt-2">
          規約による、Skeb でやり取りされた作品のすべての権利はクリエイターと版権元に帰属する。
        </p>
        <p className="pt-2">
          The copyright of all art works commissioned on Skeb belongs to the artist and the proper
          copyright holders.
        </p>
        <p className="pt-2">Some character names are obscured due to rule requirements.</p>
        <p className="pt-2">This site has restricted search engines from indexing.</p>
      </div>

      {/* The dates, name and DMCA */}
      <small className="text-p-light block pt-24 md:pb-10 dark:text-gray-300">
        <time className="tracking-tight">2022 - {new Date().getFullYear()}</time> © Crystallize
        <div className="float-right">
          <a
            href="mailto:dmca@crystallize.cc"
            className="decoration-inherit decoration-dotted underline-offset-2 dark:text-gray-300"
          >
            DMCA
          </a>
        </div>
      </small>
    </div>
  )
}

export default Footer

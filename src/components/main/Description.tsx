
import Update from '#components/main/Update'
import Title from '#components/Title'

const CommissionDescription = () => {
  return (
    <div id="--------Description--------">
      <h1 className="pb-2 md:pb-0">NSFW Commissions</h1>
      <Title Content="Introduction" />

      <p className="pt-4">
        Preview images are displayed alongside their corresponding links to platforms like Twitter,
        Pixiv, or Fantia when available. By clicking on these links, you can view the full image.
        You can also subscribe for updates through{' '}
        <a href="./rss" target="_blank">
          RSS
        </a>
        .
      </p>
      <p className="pt-6 md:pt-4">
        I am not an illustrator but someone who frequently commissions artworks. If you appreciate
        the illustrations, please consider following and supporting the illustrators. You may also
        consider to <a href="/support">support my commission projects</a>.
      </p>
      <p className="pt-6 md:pt-4">
        If any illustrators or readers wish to get in touch, don&apos;t hesitate to reach out
        through <a href="https://odaibako.net/u/CrystallizeSub">odaibako</a> or{' '}
        <a href="mailto:contact@crystallize.cc">Email</a>. Please note, any requests regarding
        the release or distribution of the illustrations will be ignored.
      </p>
      <Update />
    </div>
  )
}

export default CommissionDescription

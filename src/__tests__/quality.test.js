import { quality, rating, rate } from '..'

describe('quality', () => {
  const newPlayer = rating()

  it('rates a doubles newbie game', () => {
    expect.assertions(1)
    expect(
      quality([
        [newPlayer, newPlayer],
        [newPlayer, newPlayer],
      ])
    ).toBeCloseTo(0.4472135954999579)
  })

  it('rates a singles newbie game', () => {
    expect.assertions(1)
    expect(quality([[newPlayer], [newPlayer]])).toBeCloseTo(0.4472135954999579)
  })

  it('rates an asymmetric 3-team game of newbies', () => {
    expect.assertions(1)
    expect(
      quality([[newPlayer], [newPlayer, newPlayer], [newPlayer, newPlayer]])
    ).toBeCloseTo(0.033059777644317334)
  })

  const [rated0, rated1, rated2] = rate([
    [newPlayer],
    [newPlayer, newPlayer],
    [newPlayer, newPlayer],
  ])

  it('does not care about order', () => {
    expect.assertions(2)
    expect(quality([rated0, rated1, rated2])).toBeCloseTo(0.23467694489602298)
    expect(quality([rated2, rated1, rated0])).toBeCloseTo(0.23467694489602298)
  })

  it('thinks a fair matchis with a solo winner against second place double', () => {
    expect.assertions(1)
    expect(quality([rated0, rated1])).toBeCloseTo(0.5133204030675388)
  })

  it('thinks less so for the two losing players to play', () => {
    expect.assertions(1)
    expect(quality([rated1, rated2])).toBeCloseTo(0.4675765255797649)
  })

  it('thinks that that would be pretty similarly bad for the solo winner to play against double last place', () => {
    expect.assertions(1)
    expect(quality([rated0, rated1])).toBeCloseTo(0.4673359642059923)
  })

  it('thinks its a horrible idea for newbie solo to go up against second and third', () => {
    expect.assertions(1)
    expect(quality([[newPlayer], rated1, rated2])).toBeCloseTo(
      0.1467627753873842
    )
  })
})

function returnString() {
  return 'general message'
}

describe('a test unit for example', () => {

  it('should expect string', () => {
    let string = returnString()
    
    expect(string).toContain('message')
  });

})

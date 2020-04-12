function returnString() {
  return 'general message'
}

let a = 2;

describe('a test unit for example', () => {

  it('should expect string', () => {
    let string = returnString()
    
    expect(string).toContain('message')
    expect(a).toBeGreaterThan(0)
  });

  

})

class Welcome < ReactComponent
  def initialize(raw_props)
    super('Welcome', raw_props: raw_props)
  end

  def props
    raw_props
  end
end
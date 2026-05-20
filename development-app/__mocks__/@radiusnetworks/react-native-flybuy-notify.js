module.exports = {
  configure: jest.fn().mockResolvedValue(undefined),
  clearNotifications: jest.fn().mockResolvedValue(undefined),
  createForSitesInRegion: jest.fn().mockResolvedValue([]),
  sync: jest.fn().mockResolvedValue(undefined),
  onPermissionChanged: jest.fn(),
};

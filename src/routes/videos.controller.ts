import { RequestHandler } from 'express'
import Video from './Video'

export const createVideo: RequestHandler = async (req, resp) => {

  const videoFound = await Video.findOne({ url: req.body.url })
  if (videoFound)
    return resp.status(301).json({ message: 'The URL already exists' })

  const video = new Video(req.body)
  const savedVideo = await video.save()

  resp.json(savedVideo);
}

export const getVideos: RequestHandler = async (req, resp) => {
  try {
    const videos = await Video.find()
    return resp.json(videos);
  } catch (error) {
    resp.json(error)
  }
}

export const getVideo: RequestHandler = async (req, resp) => {
  const videoFound = await Video.findById(req.params.id)
  if (!videoFound) return resp.status(204).json();
  return resp.json(videoFound)
}

export const deleteVideo: RequestHandler = async (req, resp) => {
  const videoFound = await Video.findByIdAndDelete(req.params.id)
  if (!videoFound) return resp.status(204).json();
  return resp.json(videoFound)
}

export const updateVideo: RequestHandler = async (req, resp) => {
  const videoUpdated = await Video.findByIdAndUpdate(req.params.id, req.body, { new: true })
  console.log(videoUpdated)
}
@RestController
@RequestMapping("/file")
public class FilUploader {

  public static final String DIRECTORY = System.getProperty("user.home") + "/Downloads/uploads";

  @PostMapping("/upload")
  public ResponseEntity<List<String>> uploadFiles(@RequestParam("files") List<MultipartFile> multipartFiles) throws IOException {
    List<String> fileNames = new ArrayList<>();
    for (MultipartFile multipartFile: multipartFiles) {
      String filename = StringUtils.cleanPath(multipartFile.getOriginalFilename());
      Path fileStorage = get(DIRECTORY, filename).toAbsolutePath().normalize();
      copy(multipartFile.getInputStream(), fileStorage, REPLACE_EXISTING);
      fileNames.add(filename);
    }
    return ResponseEntity.ok().body(fileNames);
  }
}